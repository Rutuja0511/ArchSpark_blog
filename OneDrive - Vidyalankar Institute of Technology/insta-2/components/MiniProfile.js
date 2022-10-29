function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-10 ml-10">
        <img className=" h-16 w-16 rounded-full border p-[2px] " 
        src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg" alt="" />
    
      <div className="flex-1 mx-4">
        <h2 className="font-bold">rutuja0511</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
    
      <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
    </div>
  )
}

export default MiniProfile;