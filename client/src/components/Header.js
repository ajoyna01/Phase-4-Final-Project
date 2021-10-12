function Header({user}) {
  return(
    <>
    
   <span className="logo">Camper🏕 Keeper</span>
   <span className="tagline">A place for all of your favorite National Parks...</span>
   <span className="login">Logged in as {user.username}</span>
    </>
  )
};
export default Header;