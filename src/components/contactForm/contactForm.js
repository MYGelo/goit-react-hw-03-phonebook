import css from './contactForm.module.css';
import React,{ Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
      }
    nameInputId = nanoid();
    numberInputId = nanoid();
    
     handleChange = e => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };
          
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };  

    reset = () => {
        this.setState({name: '', number: ''});
        }

    //   componentDidUpdate (prevProps, prevState) {
    //     if (this.state.name !== prevState.name) {
    //          console.log("prevState:", prevState.name);
    //          console.log("this.state",this.state.name);
    //         console.log("обновилось ")
    //         localStorage.setItem('name',JSON.stringify(this.state.name));
    //       }
    //     }
      

    render() {
        const {name, number} = this.state;
            
            return (
                <form 
                onSubmit={this.handleSubmit}
                className={css.container}>
                
                
                  <label htmlFor={this.nameInputId}>Name</label>
                  <input
                   id={this.nameInputId}
                   type="text"
                   name="name"
                   value={name}
                   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                   required 
                   onChange={this.handleChange}
                   
                   />
                   
                    <label htmlFor={this.nameInputId}>Number</label>
                    <input
                        id={this.numberInputId}
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={this.handleChange}
                        />
                 <button className ={css.btn} type="submit" >add contact</button> 
            </form>
            );
        }

 }



 ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };