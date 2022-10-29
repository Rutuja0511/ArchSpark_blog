import Post from "./Post"

const posts = [
    {
        id: '123',
        username: 'rutuja',
        userImg: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        img: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        caption: 'damnm it',
    },
    {
        id: '123',
        username: 'me',
        userImg: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        img: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        caption: 'damnm it',
    },
    {
        id: '123',
        username: 'guddu',
        userImg: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        img: 'https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg',
        caption: 'damnm it',
    }
]

function Posts() {
  return (
    <div>
        {posts.map(post => (
            <Post 
            key={post.id} 
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption} />
        ))}
        
    </div>
  )
}

export default Posts