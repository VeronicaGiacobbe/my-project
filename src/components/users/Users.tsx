import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserRow from './UserRow';
import { People, UserData } from '../../model/users';

const Users: FC = (): JSX.Element => {
  const [people, setPeople] = useState<People[]>([]);
  const [newUserData, setNewUserData] = useState<UserData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
  });

  useEffect(() => {
    try {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res: { data: People[] }) => {
          setPeople(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeDataUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleAddUser = () => {
    const newUser = {
      name: newUserData.name,
      username: newUserData.surname,
      email: newUserData.email,
      phone: newUserData.phone,
      address: {
        street: newUserData.street,
        city: newUserData.city,
      },
    };
    try {
      axios
        .post('https://jsonplaceholder.typicode.com/users', newUser)
        .then((res) => {
          return setPeople([...people, res.data]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButton = (id: number) => {
    try {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          const filteredArray = people.filter(
            (item: { id: number }) => item.id !== id
          );
          setPeople(filteredArray);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabled = Object.values(newUserData).some(
    (value) => value.length <= 0
  );

  return (
    <Container>
      <OuterBoxInput>
        <InnerBoxInput>
          <input
            placeholder="name..."
            name="name"
            value={newUserData.name}
            onChange={(e) => handleChangeDataUser(e)}
          />
          <input
            name="surname"
            value={newUserData.surname}
            onChange={(e) => handleChangeDataUser(e)}
            placeholder="surname..."
          />
          <input
            placeholder="email..."
            name="email"
            value={newUserData.email}
            onChange={(e) => handleChangeDataUser(e)}
          />
        </InnerBoxInput>
        <InnerBoxInput>
          <input
            name="phone"
            value={newUserData.phone}
            onChange={(e) => handleChangeDataUser(e)}
            placeholder="phone..."
          />
          <input
            name="street"
            value={newUserData.street}
            onChange={(e) => handleChangeDataUser(e)}
            placeholder="street..."
          />
          <input
            name="city"
            value={newUserData.city}
            onChange={(e) => handleChangeDataUser(e)}
            placeholder="city..."
          />
        </InnerBoxInput>

        <AddUserButton onClick={handleAddUser} disabled={isDisabled}>
          add user
        </AddUserButton>
      </OuterBoxInput>

      <OuterBoxHeaderTable>
        <BoxHeaderTable>
          <div>Name</div>
          <div>Username</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Street</div>
          <div>City</div>
          <div>Actions</div>
        </BoxHeaderTable>

        {people?.map((item: People) => (
          <UserRow
            handleDeleteButton={handleDeleteButton}
            item={item}
            people={people}
            setPeople={setPeople}
          />
        ))}
      </OuterBoxHeaderTable>
    </Container>
  );
};

export default Users;

const OuterBoxInput = styled.div`
  margin: 3rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 90%;
  align-items: start;
  flex-wrap: wrap;

  input {
    border-radius: 5px;
    border: none;
    padding: 0.3rem;
    width: 9.3rem;
    margin: 0.6rem;
    height: 1.5rem;
  }
`;

const InnerBoxInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const AddUserButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? 'gray' : '#05ba05')};
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 0.3rem;
  width: 7.5rem;
  margin-left: 0.6rem;
`;

const BoxHeaderTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 50px;
  margin-top: 20px;
  background-color: #e2e2e2;
  padding: 1rem 5px;
`;

const OuterBoxHeaderTable = styled.div`
  margin: 2rem;
`;
