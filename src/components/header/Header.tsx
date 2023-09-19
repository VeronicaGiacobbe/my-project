import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar: FC = (): JSX.Element => {
  return (
    <BoxNavbar>
      <div>
        <BoxLink style={{ color: 'white', listStyle: 'none' }} to="/">
          <span>Users's List</span>
        </BoxLink>
        <BoxLink style={{ color: 'white', listStyle: 'none' }} to="/movie">
          <span>Movie's list</span>
        </BoxLink>
        <BoxLink style={{ color: 'white', listStyle: 'none' }} to="/weather">
          <span>Weather Forecast</span>
        </BoxLink>
      </div>
    </BoxNavbar>
  );
};

export default Navbar;

const BoxNavbar = styled.div`
  width: 100%;
  height: 5vh;
  background-color: #353333;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
`;

const BoxLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`;
