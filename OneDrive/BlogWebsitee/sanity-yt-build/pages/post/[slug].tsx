import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../sanity";
import {Post} from "../../typings";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import {useForm, SubmitHandler} from "react-hook-form";

interface IFormInput {
    _id : string;
    name: string;
    email:string;
    comment:string;
}

interface Props {
    post: Post;
}

function Post({post}: Props) {

    const {register, handleSubmit, formState:{errors},} =useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        await fetch('api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data);
        })
        .catch ((err) => {
            console.log(err);
        })
    };
    
  return (
    <main>
        <Header />

        <img className="w-full h-48 object-cover" 
        src={urlFor(post.mainImage).url()!} alt="" />

        <article className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl mt-8 mb-3">{post.title}</h1>
            <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

            <div className="flex items-center space-x-2">
                {/* <img className="h-10 w-10 rounded-full" 
                src={urlFor(post.author.image).url()!} alt="" /> */}
                <p className="font-extralight text-sm">
                    Blog post by <span className="text-green-600">{post.author.name}</span> - Published at {" "} 
                    {new Date(post._createdAt).toLocaleString()}</p>    
            </div>

            <div>
                <PortableText 
                 dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}  
                 projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                 content={post.body}
                 />
            </div>
        </article>

        <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
            <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="py-3 mt-2"></hr>

            <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
            />
            <label className="block mb-5">
                <span className="text-gray-700">Name</span>
                <input {...register("name", {required:true})}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" 
                placeholder="Enter your name" type="text" />       
            </label>
            <label {...register("email", {required:true})}
                className="block mb-5">
                <span className="text-gray-700">Email</span>
                <input className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" 
                placeholder="Enter Email Address" type="email" />       
            </label>
            <label {...register("comment", {required:true})}
                className="block mb-5">
                <span className="text-gray-700">Comment</span>
                <textarea className="shadow border rounded py-2 px-3 form-textarea mt-1
                block w-full ring-yellow-500 outline-none focus:ring" 
                placeholder="Leave comment" rows={8} />       
            </label>

            <div>
                {errors.name && (
                    <span className="text-red-500"><br>
                        -The Name field is required</br></span>
                )}
                {errors.email && (
                    <span className="text-red-500"><br>
                        -The Email Address field is required</br></span>
                )}
                {errors.comment && (
                    <span className="text-red-500"><br>
                        -The comment field is required</br></span>
                )}
            </div>

            <input type="submit" className="shadow bg-yellow-500 hover:bg-yellow-400
            focus:shadow-outline focus:outline-none text-white font-bold py-2
            px-4 rounded cursor-pointer" />
        </form>
    </main>
  )
}

export default Post;

export const getStaticPaths = async() => {
    const query = `*[_type == "post"] {
        _id,       
        slug {
            current
        }
      }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug : post.slug.current
        },
    }));

    return{
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) =>{
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
            name, 
            image
        },
        'comments': *[
            _type == "comment" &&
            post._ref == ^._id &&
            approved == true ],
        description,
        mainImage,
        slug,
        body
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if (!post) {
        return{
            notFound:true
        }
    }

    return{
        props:{
            post,
        },

        revalidate: 60, //after 60 secs it will update old cache
    }
}