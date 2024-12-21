const express = require('express');
const router = express.Router();

// Order routes
router.get('/', async (req, res) => {
    const supabase = req.supabase;
    const { data, error } = await supabase.from('payments').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

router.post('/', async (req, res) => {
    const supabase = req.supabase;

    res.send('Create a new order');
});

router.get('/:id', async (req, res) => {
    const supabase = req.supabase;
    const { id } = req.params;
    const { data, error } = await supabase.from('payments')
        .select('*')
        .eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(data);
});

module.exports = router;
