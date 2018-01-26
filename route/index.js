const express = require("express")
const router = express.Router()

let partners = [{
    id: 0,
    firstname:"Haidar",
    lastname:"Dzaky",
    username:"haidardzaky14",
    origin:"Bandung"
  },
  {
    id: 1,
    firstname:"Angeline",
    lastname:"Go",
    username:"angeline_go",
    origin:"Jakarta"
  },
  {
    id: 2,
    firstname:"Fahri",
    lastname:"Hakim",
    username:"fahriabdhakim",
    origin:"Bandung"
  },

]

// get item by id
const getItemById = (items, id) => {
  const item = items.filter(item => {
    return item.id === Number(id)
  })
  return item
}

// save new item
const saveNewItem = (items, data) => {
  items.push(data)
}

// display partners
router.get("/", (req, res) => {
  res.send(partners)
})

//display single partner
router.get("/:id", (req, res) => {
  res.send({
    message: `get single partner`,
    partner: getItemById(partners, req.params.id)
  })
})

//save new partner
router.post("/", (req, res) => {
  const data = {
    id: partners.length,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    origin:req.body.citis,

  }
  saveNewItem(partners, data)
  res.send(partners)
})

// delete partners
router.delete("/", (req, res) => {
  partners.splice(0, partners.length)
  res.send(partners)
})

// delete single partner
router.delete("/:id", (req, res) => {
  const currentpartners = partners.filter(partner => {
    return partner.id !== Number(req.params.id)
  })
  partners = currentpartners
  res.send({
    message: `partner deleted`,
    currentpartners: partners
  })
})

//Update partner
router.put(`/:id`, (req, res) => {
  const itemId = Number(req.params.id)
  const name = req.body.name
  const team = req.body.team
  const posistion = req.body.position
  const status = req.body.status

  //find data index
  const itemIndex = partners.findIndex((item, index) => {
    return item.id === itemId
  })

  //Modify matched data
  partners[itemIndex]["name"] = name
  partners[itemIndex]["team"] = team
  partners[itemIndex]["position"] = posistion
  partners[itemIndex]["status"] = status

  // Prepare  response
  const response = {
    message: `partner data has been updated !`,
    itemId: itemId,
    itemBody: itemBody,
    itemIndex: itemIndex,
    partners: partners
  }

  //send response
  res.send(response)

})

module.exports = router;
