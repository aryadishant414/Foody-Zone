import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult.jsx';

// export const BASE_URL = "http://localhost:9000";
export const BASE_URL = "https://foody-zone-backend.vercel.app/";

const App = () => {

  const [data , setData] = useState(null);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);
  const [filteredData , setFilteredData] = useState(null);
  const [selectedBtn , setSelectedBtn] = useState("all");  //Using to change the color of btn when clicked



  useEffect( () => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);
        // console.log(response);
        const jsonData = await response.json();
        console.log(jsonData);
         setData(jsonData);
         setFilteredData(jsonData);
         setLoading(false);
       } catch (error) {
        setError("Unable to fetch the data");
      }
     };
     fetchFoodData();
  } , []);

  const filterSearchFood = (e) => {
    const searchedValue = e.target.value;
    // console.log(searchedValue);  // just to check
   
    // if(searchedValue === "") { // no need of this code
    //   setFilteredData(null);
    // }

    const filter = data?.filter((food) => (
      food.name.toLowerCase().includes(searchedValue.toLowerCase())
    ));
    setFilteredData(filter);
  }

    const filterUsingButton = (type) => {
      if (type === "all") {
        setFilteredData(data);
        setSelectedBtn("all"); // Using to change the color of btn when clicked
        return;
      }

      const filter = data?.filter((food) => (
        food.type.toLowerCase().includes(type.toLowerCase())
      ));

      setFilteredData(filter);
      setSelectedBtn(type); //Using to change the color of btn when clicked
    }


  // EXAMPLE of Data that we are fetching
  // [
  //   {
  //       "name": "Boilded Egg",
  //       "price": 10,
  //       "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //       "image": "/images/egg.png",
  //       "type": "breakfast"
  //   },
  // ]

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if(error) {
    return <div>{error}</div>
  }

  if(loading) {
    return <div>{loading}</div>
  }


  

  

  

  return ( 
    <>
    <MainContainer>

      <TopContainer>
        <div className='logo'>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className='search'>
          <input onChange={filterSearchFood} placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((eachButton) => (
          <Button
            isSelected = {selectedBtn === eachButton.type}
           key={eachButton.name} onClick={() => filterUsingButton(eachButton.type)}>{eachButton.name}</Button>
        ))}
        {/* <Button onClick={() => filterUsingButton("all")}>All</Button>
        <Button onClick={() => filterUsingButton("breakfast")}>Breakfast</Button>
        <Button onClick={() => filterUsingButton("lunch")}>Lunch</Button>
        <Button onClick={() => filterUsingButton("dinner")}>Dinner</Button> */}
      </FilterContainer>

    </MainContainer>

    <SearchResult data = {filteredData} />
    </>
  );
  };

export default App;

export const MainContainer = styled.div`
  /* border: 2px solid red; */
  max-width: 1200px;
  margin: 0 auto;
`
const TopContainer = styled.section`

  display: flex;
  justify-content: space-between;
  height: 140px;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 10px 15px;

      &::placeholder {
      color: white;
    }
    }
  }


  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`;

const FilterContainer = styled.section`
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  padding: 6px 12px;
  gap: 10px;
  height: 31px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

