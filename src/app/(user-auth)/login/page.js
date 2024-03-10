async function getData() {
  const res = await fetch('/api/poop')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Login(){
  const data = await fetch('http://localhost:3000/api/poop')
  const jsonData = await data.json();


  //now that im gonna use route handlers like so need to see 2 things
  //1 how to set up mongoDb if not ill do pocket base
  //2 how to do passport or best user auth with next js
  return (
    <>
    {jsonData.users && jsonData.users.map((user, index) => (
      <p key={user.id || index}>{user.name}</p>
    ))}
  </>
  )
}