import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import IEmployee from './models/Employee.model';
import IUser from './models/User.model';
import IUserData from './models/UserData.model';
import IListItemProps from './models/ListItemProps.model';
import './App.css';

const ListItem = (props: IListItemProps) => (
          <ListGroup.Item as="li"
                          className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">{props.title}</div>
                            {props.description}
                            </div>
          </ListGroup.Item>
  );

function App() {
  const [createdUser, setCreatedUser] = React.useState<IUser[]>([]);

  const [post, setPostedUser] = React.useState<IEmployee[]>([]);

  const [put, setPutUser] = React.useState<IEmployee[]>([]);


  useEffect(() => {

    async function init() {
        const resultGet = await GetUser();
        setCreatedUser([resultGet.data]);

        const resultPost = await PostUser();
        setPostedUser([resultPost]);

        const resultPut = await PutUser();
        setPutUser([resultPut]);
        
    }

     init();
  }, []);
  

  return(<>
                 {createdUser.map(item => (
                    <div>
                    <ListItem key={item.id} title='Get user' description={item.first_name + ' ' + item.last_name + ' ' + item.email}/>
                    </div>                  
                  ))}

                  {post.map(item => (
                    <div>
                    <ListItem key={item.id} title='Post User' description={item.name + ' ' + item.job} />
                    </div>
                    
                  ))}

                  {put.map(item => (
                    <div>
                    <ListItem key={item.id} title='Put User' description={item.name + ' ' + item.job}/>
                    </div>             
                  ))}              
          </>);
}

// get single user


async function GetUser() : Promise<IUserData> {
  const result = await fetch('https://reqres.in/api/users/2');
  const a = await result.json();
  console.log(a);
  return a;
}

// post user

async function PostUser() : Promise<IEmployee> {
  const user = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'morpheus', job: 'leader' })
  };

  const result = await fetch('https://reqres.in/api/users', user);
  const a = await result.json();
  console.log(a);
  return a;
}

// put user

async function  PutUser() : Promise<IEmployee>{
  const user = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: 'morpheus', job: 'zion resident'})
  };

  const result = await fetch('https://reqres.in/api/users/2', user);
  const a = await result.json();
  console.log(a);
  return a;
}

// delete user

async function  DeleteUser() {
  const result = await fetch('https://reqres.in/api/users/2');
  const a = await result.json();

  console.log(a);
  return a;
}

export default App;
