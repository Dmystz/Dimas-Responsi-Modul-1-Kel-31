import { Router } from 'express';
import {
    listMembers, getMember, addMember, memberLoans
} from '../controllers/memberController.js';

const router = Router();

router.get('/', listMembers);
router.post('/', addMember);
router.get('/:id/loans', memberLoans);
router.get('/:id', getMember);

export default router;