const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../models/contacts.js")

const router = express.Router()

router.get('/', async (req, res, next) => {
  const data = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId)
  if(data.length > 0) {
    res.json({
      status: 'success',
      code: 200,
      data
    })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  const data = await addContact(req.body)
  if(data){
    res.status(201).json({
      status: 'success',
      code: 201,
      data
    })
  } else {
    res.status(400).json({ message: "Missing required name - field" })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId)
  if(data) {
    res.status(200).json({ message: 'Contact deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body)
  const params = await updateContact(req.params.contactId)
  const body = await updateContact(req.body)

  if(data){
    res.status(200).json(data)
  }
  else if(params && !body) {
    res.status(400).json({ message: "Missing fields" })
  }
  else if(!data){
    res.status(404).json({ message: "Not found" })
  }
})

module.exports = router
