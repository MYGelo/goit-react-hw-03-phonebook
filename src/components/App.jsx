import  React, { Component } from "react"
import { ContactForm } from "./contactForm/contactForm";
import { ContactList } from "./contactList/contactList";
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

 
export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount (prevProps ,prevState) {
    console.log("componentDidMount");
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    // this.setState(this.state: contacts = parsedContacts)
    if (parsedContacts) {
      console.log('достаю контакты из хранилища');
      this.setState(prevState = parsedContacts)
    }
  }

  componentDidUpdate ( prevProps, prevState) {

    if (this.state !== prevState) {
      localStorage.setItem('contacts',JSON.stringify(this.state));
      console.log("обновилось записная книга (contacts)");
      
    }
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
    
  };
  getNewList = () => {
    const {filter, contacts} = this.state;
    const newContactList = contacts.filter(contact => {
      return (
      contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    })
    return newContactList;
  };

  onSubmitForm = data => {
    const id = nanoid();
    const contact = {id, ...data};
    const contactExists = this.state.contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase());

    if (contactExists) {
        alert(`${contact.name} is already in contacts.`);
        return ;
      } 

    this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact],
        };
	
    });
  };

  onDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  }

  

  render () {
    
    const {filter} = this.state;
     

    return ( 
      
      <div style = {{ 
        justifyContent: 'center',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <h1>Phonebook</h1>
        <ContactForm
        onSubmit={this.onSubmitForm}
        />
        <h2>Contacts</h2>
        <Filter
        filter={filter} 
        handleChange={this.handleChange}
        />
         <ContactList  
         contacts={this.getNewList()}
         onDelete={this.onDelete}
         />
      </div>
    )
  }

}

