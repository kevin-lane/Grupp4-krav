import styled from "styled-components";


function Navbar() {

  return (
    <Navigationbar>
        <button>QUIT GAME</button>
        <button onClick={refresh}>NEW GAME</button>
    </Navigationbar>
  );
}

export default Navbar;


