const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose Schema for your inputs
const inputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  city: { type: String, required: true },
  salary: { type: String, required: true },
});

const Input = mongoose.model('Input', inputSchema);

// Create (POST) - Save an input
app.post('/inputs', async (req, res) => {
  try {
    const { name, job, city, salary } = req.body;
    const newInput = new Input({ name, job, city, salary });
    await newInput.save();
    res.status(201).json({ message: 'Input saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all inputs (GET)
app.get('/inputs', async (req, res) => {
  try {
    const inputs = await Input.find({}, '-__v'); // Exclude __v field
    res.status(200).json(inputs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single input by ID (GET)
app.get('/inputs/:id', async (req, res) => {
  try {
    const input = await Input.findById(req.params.id);
    if (!input) {
      return res.status(404).json({ message: 'Input not found' });
    }
    res.status(200).json(input);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an input by ID (PUT)
app.put('/inputs/:id', async (req, res) => {
  try {
    const { name, job, city, salary } = req.body;
    const updatedInput = await Input.findByIdAndUpdate(
      req.params.id,
      { name, job, city, salary },
      { new: true }
    );
    if (!updatedInput) {
      return res.status(404).json({ message: 'Input not found' });
    }
    res.status(200).json({ message: 'Input updated successfully', updatedInput });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an input by ID (DELETE)
app.delete('/inputs/:id', async (req, res) => {
  try {
    const deletedInput = await Input.findByIdAndDelete(req.params.id);
    if (!deletedInput) {
      return res.status(404).json({ message: 'Input not found' });
    }
    res.status(200).json({ message: 'Input deleted successfully', deletedInput });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/*
app.delete('/inputs', async (req, res) => {
  try {
    const deletedAllInputs = await Input.deleteMany({});
    if (deletedAllInputs.deletedCount === 0) {
      return res.status(404).json({ message: 'No inputs found to delete' });
    }
    res.status(200).json({ message: 'All inputs deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/



// Search inputs by job, city, or both (GET)
app.get('/search', async (req, res) => {
  try {
    const { job, city } = req.query;
    let query = {};

    if (job && city) {
      // Search when both job and city are provided
      query = { job: { $regex: job, $options: 'i' }, city: { $regex: city, $options: 'i' } };
    } else if (job) {
      // Search when only job is provided
      query = { job: { $regex: job, $options: 'i' } };
    } else if (city) {
      // Search when only city is provided
      query = { city: { $regex: city, $options: 'i' } };
    } else {
      return res.status(400).json({ message: 'Please provide input2 or input3 parameters' });
    }

    const inputs = await Input.find(query, '-__v');
    res.status(200).json(inputs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
