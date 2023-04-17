function AllData() {
  const ctx = React.useContext(UserContext);
  const usersData = ctx.users;


  function createCard(user) {
    const { id, firstName, lastName, email, password, balance, loggedIn } = user;
    return (
      <Card
        key={id}
        txtcolor="black"
        header={`Name: ${firstName} ${lastName}`}
        body={
          <>
            <p className="card-text">id: {id}</p>
            <p className="card-text">email: {email}</p>
            <p className="card-text">password: {password}</p>
            <p className="card-text">balance: ${balance}</p>
            {loggedIn !== undefined && <p className="card-text">loggedIn: {loggedIn.toString()}</p>}
          </>
        }
      />
    );
  }
  

  const cards = usersData.map(createCard);

  return (
    <div>
      {cards}
    </div>
  );
}

