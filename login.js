  function Login(){
  const [show, setShow]         = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [allFieldsEmpty, setAllFieldsEmpty] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const users = ctx.users;

  function validate(field, label){
    console.log('validate');
      if (!field) {
        setStatus(<div className="alert alert-warning" role="alert">Alert, the following field is blank: {label} </div>)
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }


  function handleSubmit(event){
    console.log('handleSubmit called');
    if (!validate(userEmail,    'User Email'))    return;
    if (!validate(userPassword, 'User Password')) return;
  
    const user = users.find(u => u.email === userEmail && u.password === userPassword);
    if (!user) {
      setStatus(<div className="alert alert-danger" role="alert">Invalid email or password</div>);
      setTimeout(() => setStatus(''), 3000);
      return;
    }
  
    user.loggedIn = true;

    setLoggedIn(true);
  
    setShow(false);
  }
  
  React.useEffect(() => {
    if ( userEmail || userPassword) {
      setAllFieldsEmpty(false);
    } else {
      setAllFieldsEmpty(true);
    }
  }, [userEmail, userPassword]);


   return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? (  
              <>
              User Email<br/>
             <input 
              type="input" 
              className="form-control" 
              id="userEmail" 
              placeholder="Enter Email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)}/>
              <br/>User Password<br/>
             <input 
              type="password" 
              className="form-control" 
              id="userPassword" 
              placeholder="Enter password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}/>
              <br/>
             <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handleSubmit}
              disabled={allFieldsEmpty}>Login</button>
              </>
            ):(
              <>
              <h5>You are loggedIn</h5>
              </>
            )}
   />
  ) 
}
