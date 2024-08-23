import styled from 'styled-components';

const App = () => {
  return ( 
    <MainContainer>

      <TopContainer>
        <div className='logo'>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className='search'>
          <input placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>

    </MainContainer>
  );
  };

export default App;

const MainContainer = styled.div`
  /* border: 2px solid red; */
  max-width: 1200px;
  margin: 0 auto;
`
const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 140px;
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
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

const Button = styled.button`
  background-color: #FF4343;
  padding: 6px 12px;
  gap: 10px;
  height: 31px;
  border-radius: 5px;
  border: none;
  color: white;
`;