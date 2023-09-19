import React, { useState } from 'react';
import axios from 'axios';
import { People, UserData } from '../../model/users';
import styled from 'styled-components';

interface Props {
  item: People;
  handleDeleteButton: (id: number) => void;
  people: People[];
  setPeople: React.Dispatch<React.SetStateAction<People[]>>;
}

const UserRow = (props: Props): JSX.Element => {
  const { item, handleDeleteButton, people, setPeople } = props;
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [editUserData, setEditUserData] = useState<UserData>({
    name: item?.name,
    surname: item?.username,
    email: item?.email,
    phone: item?.phone,
    street: item?.address?.street,
    city: item?.address?.city,
  });

  const handleEditUpdate = () => {
    const editUser = {
      name: editUserData.name,
      username: editUserData.surname,
      email: editUserData.email,
      phone: editUserData.phone,
      address: {
        street: editUserData.street,
        city: editUserData.city,
      },
    };
    try {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${item.id}`, editUser)
        .then(() => {
          const peopleUpdated = people.map((person) => {
            if (person.id === item.id) {
              return {
                ...person,
                ...editUser,
              };
            } else {
              return person;
            }
          });
          setToggleEdit(false);
          setPeople(peopleUpdated);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDataUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditUserData({
      ...editUserData,
      [name]: value,
    });
  };

  return (
    <>
      {toggleEdit && (
        <Overlay>
          <EditBox>
            <BoxInput>
              <label>Name:</label>
              <EditInput
                name="name"
                value={editUserData.name}
                placeholder="name"
                onChange={(e) => handleChangeDataUser(e)}
              />
            </BoxInput>

            <BoxInput>
              <label>Username:</label>
              <EditInput
                name="surname"
                value={editUserData.surname}
                onChange={(e) => handleChangeDataUser(e)}
                placeholder="username..."
              />
            </BoxInput>

            <BoxInput>
              <label>Email:</label>
              <EditInput
                placeholder="email..."
                name="email"
                value={editUserData.email}
                onChange={(e) => handleChangeDataUser(e)}
              />
            </BoxInput>

            <BoxInput>
              <label>Phone:</label>
              <EditInput
                name="phone"
                value={editUserData.phone}
                onChange={(e) => handleChangeDataUser(e)}
                placeholder="phone..."
              />
            </BoxInput>

            <BoxInput>
              <label>Street:</label>
              <EditInput
                name="street"
                value={editUserData.street}
                onChange={(e) => handleChangeDataUser(e)}
                placeholder="street..."
              />
            </BoxInput>

            <BoxInput>
              <label>City:</label>
              <EditInput
                name="city"
                value={editUserData.city}
                onChange={(e) => handleChangeDataUser(e)}
                placeholder="city..."
              />
            </BoxInput>

            <UpdateButton onClick={handleEditUpdate}>Update</UpdateButton>
            <CancelButton onClick={() => setToggleEdit(false)}>
              Cancel
            </CancelButton>
          </EditBox>
        </Overlay>
      )}
      <BoxItemTable>
        <Box>{item?.name}</Box>
        <Box>{item?.username}</Box>
        <Box>{item?.email}</Box>
        <Box>{item?.phone}</Box>
        <Box>{item?.address?.street}</Box>
        <Box>{item?.address?.city}</Box>
        <ButtonContainer>
          <DeletedButton onClick={() => handleDeleteButton(item.id)}>
            Delete
          </DeletedButton>
          {item?.id <= 10 && (
            <EditButton onClick={() => setToggleEdit(true)}>Edit</EditButton>
          )}
        </ButtonContainer>
      </BoxItemTable>
    </>
  );
};

export default UserRow;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const DeletedButton = styled.button`
  margin-right: 0.3rem;
  background-color: red;
  border-radius: 5px;
  color: white;
  padding: 0.3rem;
  width: 4.3rem;
  border: none;
`;

const EditButton = styled.button`
  margin-right: 0.3rem;
  background-color: #016cee;
  border-radius: 5px;
  color: white;
  padding: 0.3rem;
  width: 2.5rem;
  border: none;
`;

const EditBox = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  background-color: rgb(220, 232, 239);
  box-shadow: rgba(0, 0, 0, 0.192) 5px 5px 15px;
  height: 13.7rem;
  width: 37.5rem;
  border-radius: 8px;
  border: 2px solid white;
  right: 30%;
  top: 40%;
  z-index: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.6rem;
`;

const EditInput = styled.input`
  width: 9.3rem;
  padding: 0.3rem;
  border: none;
  border-radius: 5px;
  height: 1.56rem;
  text-align: center;
  margin: 0.3rem 0.6rem;
`;

const UpdateButton = styled.button`
  background-color: #05ba05;
  color: white;
  border: none;
  padding: 0.3rem;
  border-radius: 5px;
  width: 7.5rem;
  height: 2.3rem;
  margin: 0.6rem;
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 0.3rem;
  border-radius: 0.3rem;
  width: 7.5rem;
  height: 2.3rem;
  margin: 0.6rem;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.46);
  width: 100%;
  height: 57.7rem;
  position: absolute;
  top: 0px;
  left: 0;
`;
const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: bold;
  margin: 0.3rem 0.3rem;

  label {
    margin-left: 0.6rem;
    margin-bottom: 0.3rem;
  }
`;

const BoxItemTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 50px;
  margin-top: 20px;
`;
const Box = styled.div`
  width: 150px;
  margin: 0 10px 0 0;
`;
