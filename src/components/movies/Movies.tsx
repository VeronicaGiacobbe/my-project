import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Film } from '../../model/film';

const API_KEY = '1cc0d25f1051d308bb2b4ec11a6cca42';

const Movies: FC = (): JSX.Element => {
  const [filmList, setFilmList] = useState<Film[]>([]);
  const [filmListFiltered, setFilmListFiltered] = useState<Film[]>([]);

  useEffect(() => {
    fetchFilmList();
  }, []);

  const fetchFilmList = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );

      const movies = response.data.results.slice(0, 15);
      setFilmList(movies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButton = (id: number) => {
    const filteredArr = filmList.filter((item) => item.id !== id);
    setFilmList(filteredArr);
  };

  const handleSearchMovie = (e: string) => {
    const searchedMovie = filmList.filter((item) =>
      item.title.toLowerCase().includes(e.toLowerCase())
    );
    setFilmListFiltered(searchedMovie);
  };

  const filmToRender =
    filmListFiltered.length > 0 ? filmListFiltered : filmList;

  return (
    <OuterBox>
      <input
        placeholder=" Search movie..."
        onChange={(e) => handleSearchMovie(e.target.value)}
      />

      <OuterBoxCard>
        {filmToRender.map((film) => (
          <Card key={film.id}>
            <BoxTitle>
              <BoxInfo>
                <span>{film.title}</span>
                <button onClick={() => handleDeleteButton(film.id)}>x</button>
              </BoxInfo>
            </BoxTitle>

            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt=""
            />
          </Card>
        ))}
      </OuterBoxCard>
    </OuterBox>
  );
};

export default Movies;

const OuterBox = styled.div`
  background-color: #eed4ac;
  height: 65.6rem;
  input {
    width: 225px;
    height: 35px;
    margin: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 5px 5px 15px rgb(0, 0, 0);
  }
`;

const OuterBoxCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  input {
    width: 50px;
  }
`;

const Card = styled.div`
  width: 230px;
  height: 300px;
  margin: 10px;
  background-color: #ffff;
  box-shadow: 5px 5px 15px rgb(0, 0, 0);
  border-radius: 8px;

  img {
    height: 250px;
    width: 100%;
    border-radius: 8px;
  }
  p {
    font-size: 12px;
  }
  span {
    font-weight: bold;
  }
`;

const BoxTitle = styled.div`
  height: 40px;
  color: #010101;
  padding: 10px;

  p {
    height: 50px;
    text-overflow: ellipsis;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

const BoxInfo = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f60202;
    color: white;
    width: 18px;
    height: 18px;
    border: none;
  }
`;
