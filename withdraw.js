function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [balance, setBalance]   = React.useState(0);
  const [withdraw, setWithdraw]   = React.useState('');
  const [allFieldsEmpty, setAllFieldsEmpty] = React.useState(true);
  
  const ctx = React.useContext(UserContext);  

  React.useEffect(() => {
    const userIndex = ctx.users.findIndex(user => user.loggedIn);
    if (userIndex !== -1) {
      setBalance(ctx.users[userIndex].balance);
    }
    if (withdraw) {
      setAllFieldsEmpty(false);
    } else {
      setAllFieldsEmpty(true);
    }
  }, [ctx.users, withdraw]);

  function validate(field, label){
    if (!field) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, the following field is blank: {label} </div>)
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if (!/^-?\d+(\.\d+)?$/.test(field)) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, the following field must be a number: {label} </div>);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (parseFloat(field) > parseFloat(balance)) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, you cannot withdraw more than your balance.</div>);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (parseFloat(field) <= 0) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, you cannot withdraw a negative or zero amount.</div>);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit() {
    console.log(withdraw);
    if (!validate(withdraw, 'withdrawal')) return;
  
    const userIndex = ctx.users.findIndex(user => user.loggedIn);
    if (userIndex === -1) {
      setStatus(<div className="alert alert-danger" role="alert">Error: No user is currently logged in.</div>);
      return;
    }
  
    const user = ctx.users[userIndex];
    const newBalance = user.balance - parseFloat(withdraw);
  
   
    ctx.users[userIndex] = { ...user, balance: newBalance };
  
    setBalance(newBalance);
    setShow(false);
  }
  

  function clearForm(){
    setWithdraw('');
    setShow(true);
  }


  return (
    <Card
    bgcolor="primary"
    header="Make a withdrawal"
    status={status}
    body={ show ? (
            <>
            Balance $ {balance} <br/>
            Withdrawal<br/>
            <input type="input" className="form-control" id="withdraw" placeholder="Enter withdrawal amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
            <button
            type="submit" 
            className="btn btn-light" 
            onClick={handleSubmit}
    disabled={allFieldsEmpty}
            >Submit</button>
            </>
            ) : (
            <>
            <h5>Your withdrawal was successful, your current balance is $ {balance}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
            </>

          )}
    />
  )
}
