import { Router } from 'express';
import {
    listBooks, getBook, addBook, editBook, removeBook
} from '../controllers/bookController.js';

const router = Router();

router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.put('/:id', editBook);
router.delete('/:id', removeBook);

export default router;