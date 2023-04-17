function Spa() {

  return (
    <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{ users:[{id:1, firstName:'Peter',lastName:'Parker', email:'peter.parker@mit.edu',
      password:'secret',balance:100, loggedIn:false}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/balance/" component={Balance} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>      
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);

