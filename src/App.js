// src/App.js
import contactsOriginal from "./contacts.json";
import "./App.css";
import { useState } from "react";

function App() {
  const slicedContacts = contactsOriginal.slice(0, 5);
  const [contacts, setContacts] = useState(slicedContacts);

  const handleDisplayContact = () => {
    const contactsOriginalCopy = [...contacts];
    const remainingContacts = contactsOriginal.filter(
      (item) => !contactsOriginalCopy.includes(item)
    );

    const randomContact =
      remainingContacts[
        Math.floor(Math.random() * remainingContacts.length - 1)
      ];

    contactsOriginalCopy.push(randomContact);
    setContacts(contactsOriginalCopy);
  };

  const handleSortbyPopularity = () => {
    const contactsOriginalCopy = [...contacts];
    contactsOriginalCopy.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContacts(contactsOriginalCopy);
  };

  const handleSortByName = () => {
    const contactsOriginalCopy = [...contacts];
    contactsOriginalCopy.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(contactsOriginalCopy);
  };

  const handleDelete = (contactId) => {
    const contactsOriginalCopy = [...contacts];
    const filteredContact = contactsOriginalCopy.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts(filteredContact);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={handleDisplayContact}>Add Random Contact</button>
      <button onClick={handleSortbyPopularity}>Sort by popularity</button>
      <button onClick={handleSortByName}>Sort by name</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.name}>
                <td>
                  <img
                    className="starPicture"
                    src={contact.pictureUrl}
                    alt="starPictur"
                  />
                </td>

                <td>
                  <h2>{contact.name}</h2>
                </td>

                <td>
                  <h2>{contact.popularity}</h2>
                </td>

                <td>
                  <h2>{contact.wonOscar ? "🏆" : ""}</h2>
                </td>

                <td>
                  <h2>{contact.wonEmmy ? "🌟" : ""}</h2>
                </td>
                <td>
                  <button onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
