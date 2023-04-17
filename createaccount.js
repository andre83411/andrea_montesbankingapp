function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [allFieldsEmpty, setAllFieldsEmpty] = React.useState(true);
  const [newUser, setNewUser] = React.useState([])

  const ctx = React.useContext(UserContext);  

  function generateId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  function validate(field, label){
    console.log('validate');
      if (!field) {
        setStatus(<div className="alert alert-warning" role="alert">Alert, the following field is blank: {label} </div>)
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function validatePassword(password) {
    console.log('validate password');
    if (password.length < 8) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, the password should be more than 8 characters </div>)
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  };
  
  function handleSubmit(event){
    console.log(firstName,lastName,email,password);
    if (!validate(firstName,'first name')) return;
    if (!validate(lastName, 'last name')) return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePassword(password)) return;
    setShow(false);
    const id = generateId();
    const newUserObj = {id, firstName, lastName, email, password, balance: 0};
    ctx.users.push(newUserObj);
    setNewUser(newUserObj);
  }
  
  
  React.useEffect(() => {
    if (firstName || lastName || email || password) {
      setAllFieldsEmpty(false);
    } else {
      setAllFieldsEmpty(true);
    }
  }, [firstName, lastName, email, password]);

  function clearForm(){
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              First Name<br/>
              <input type="input" className="form-control" id="firstName" placeholder="Enter first name" value={firstName}  onChange={e => setFirstName(e.currentTarget.value)}/><br/>
              Last Name<br/>
              <input type="input" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.currentTarget.value)} /><br/>
              Email address<br/>
             <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
             <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
             <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handleSubmit}
              disabled={allFieldsEmpty}>Create Account</button>
              </>
            ):(
              <>
              <h5>Your account was created</h5><br/>
              <p>Your id is: {newUser.id}</p><br/>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
   />
  )
}