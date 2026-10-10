import { Router } from 'express';
import {
    listLoans, getLoan, addLoan,
    editLoan, returnBook, removeLoan
} from '../controllers/loanController.js';

const router = Router();

router.get('/', listLoans);
router.post('/', addLoan);
router.patch('/:id/return', returnBook);
router.get('/:id', getLoan);
router.put('/:id', editLoan);
router.delete('/:id', removeLoan);

export default router;