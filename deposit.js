function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [balance, setBalance]   = React.useState(0);
  const [deposit, setDeposit]   = React.useState('');
  const [allFieldsEmpty, setAllFieldsEmpty] = React.useState(true);

  const ctx = React.useContext(UserContext);  

  React.useEffect(() => {
    if (deposit) {
      setAllFieldsEmpty(false);
    } else {
      setAllFieldsEmpty(true);
    }
  }, [deposit]);

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
    if (parseFloat(field) < 0) {
      setStatus(<div className="alert alert-warning" role="alert">Alert, the following field can only accept positive numbers: {label} </div>);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validate(deposit, 'deposit')) return;
    const userIndex = ctx.users.findIndex(user => user.loggedIn);
    if (userIndex === -1) {
      setStatus(<div className="alert alert-danger" role="alert">Error: No user is currently logged in.</div>);
      return;
    }

    const loggedInUser = ctx.users.find(user => user.loggedIn);
    const newBalance = loggedInUser.balance + parseFloat(deposit);

    

    loggedInUser.balance = newBalance;
    setBalance(newBalance);
    setShow(false);
  }
  

  function clearForm(){
    setDeposit('');
    setShow(true);
  }



  return (
    <Card
    bgcolor="primary"
    header="Make a deposit"
    status={status}
    body={ show ? (
            <>
            Balance $ {balance} <br/>
            Deposit<br/>
            <input 
            type="input" 
            className="form-control" 
            id="deposit" 
            placeholder="Enter deposit amount" 
            value={deposit} 
            onChange={e => setDeposit(e.currentTarget.value)}/><br/>
            <button
            type="button" 
            className="btn btn-light" 
            onClick={handleSubmit}
            disabled={allFieldsEmpty}
            >Submit</button>
            </>
            ) : (
            <>
            <h5>Your deposit was received.<br/>Your current balance is $ {balance}</h5>
            <button type="button" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
            </>

          )}
    />
  )
};
