const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;

const UserContext = React.createContext({
  users: [],
  setUsers: (newUsers) => {}, 
});

function UserProvider(props) {
    
  const [users, setUsers] = React.useState([]);

  const values = {
    users,
    setUsers: (newUsers) => setUsers(newUsers), 
  };

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
};


function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} 
      style={{
        maxWidth: "50%",
        display: "block",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        }}>
        <div className="card-header" 
        style={{
          backgroundColor:"orangered", 
          color:"white", 
          textAlign:"end", 
          fontSize:"20px"
          }}
        >
          {props.header}
        </div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }

  
  