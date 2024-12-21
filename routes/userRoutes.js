const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const supabase = req.supabase;

    const { data, error } = await supabase.from('customers').select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
}
);

router.get('/:id', async (req, res) => {
    const supabase = req.supabase;
    const { id } = req.params;

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(data[0]);
});


router.post('/', async (req, res) => {
    const supabase = req.supabase;

    const { name, email } = req.body;
    const { data, error } = await supabase
        .from('customers')
        .insert([{ name, email }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});

module.exports = router;
