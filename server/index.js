const express = require('express');
const app = express();
const port = 4002;
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

