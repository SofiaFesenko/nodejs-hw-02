import { ContactsCollection } from "../db/models/contacts.js"

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find()
    return contacts
}

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId)
    return contact
}

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload)
    return contact
};

// export const updateContact = async (req, res) => {
//     try {
//         const contactId = req.params.contactId
//         const contact = await ContactsCollection.findOneAndUpdate({_id: contactId}, req.body, {new: true})
//         if (!contact) {
//             return res.status(404).json({ error: 'Contact not found' });
//         }
//         res.json({contact})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'something went wrong'})
//     }
// }

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
          new: true,
          ...options
        },
    );
    
    if (!rawResult) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
}

export const deleteContact = async (contactId) => {
    return await ContactsCollection.findOneAndDelete({_id: contactId})
}