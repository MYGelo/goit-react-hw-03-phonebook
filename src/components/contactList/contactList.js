import css from './contactList.module.css';
import PropTypes from 'prop-types';



export const ContactList = ({ contacts, onDelete }) => {
    
    return (
        <ul className={css.contact__list}>
            {contacts.map((contact, id) => (
                <li key={id} className={css.contact__list__item}>
                    <span className={css.contact__list__text}>{contact.name} :</span>
                    <span className={css.contact__list__text}>{contact.number}</span>
                    <button
                    className={css.contact__list__btn} 
                    type='button'
                    onClick={() => onDelete(contact.id)}
                    > Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};


ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onDelete: PropTypes.func.isRequired,
  };
