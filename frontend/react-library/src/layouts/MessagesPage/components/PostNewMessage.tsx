import { useState } from 'react';
import apiService from '../../../services/apiService';
import authService from '../../../services/authService';
import MessageModel from '../../../models/MessageModel';

export const PostNewMessage = () => {
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [warningMessage, setWarningMessage] = useState('All fields must be filled out');

    async function submitNewQuestion() {
        const user = authService.getCurrentUser();
        console.log('Submit question - User:', user);
        console.log('Submit question - Title:', `"${title}"`);
        console.log('Submit question - Question:', `"${question}"`);
        console.log('Submit question - Title length:', title.length);
        console.log('Submit question - Question length:', question.length);
        console.log('Submit question - Title trimmed:', `"${title.trim()}"`);
        console.log('Submit question - Question trimmed:', `"${question.trim()}"`);
        
        if (!user) {
            console.error('No user found - please login first');
            setWarningMessage('Please login first to submit a question');
            setDisplayWarning(true);
            setDisplaySuccess(false);
            return;
        }
        
        if (title.trim() !== '' && question.trim() !== '') {
            try {
                const messageRequestModel: MessageModel = new MessageModel(title.trim(), question.trim());
                console.log('Sending message:', messageRequestModel);
                
                await apiService.post('/messages/secure/add/message', messageRequestModel);

                setTitle('');
                setQuestion('');
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } catch (error) {
                console.error('Error submitting question:', error);
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
        } else {
            console.warn('Validation failed - Title or Question is empty after trimming');
            console.warn('Title value:', `"${title}"`);
            console.warn('Question value:', `"${question}"`);
            setWarningMessage('All fields must be filled out');
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    
    return (
        <div className='card mt-3'>
            <div className='card-header'>
                Ask question to Luv 2 Read Admin
            </div>
            <div className='card-body'>
                <form method='POST'>
                    {displayWarning && 
                        <div className='alert alert-danger' role='alert'>
                            {warningMessage}
                        </div>
                    }
                    {displaySuccess && 
                        <div className='alert alert-success' role='alert'>
                            Question added successfully
                        </div>
                    }
                    <div className='mb-3'>
                        <label className='form-label'>
                            Title
                        </label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='exampleFormControlInput1' 
                            placeholder='Title' 
                            onChange={e => setTitle(e.target.value)} 
                            value={title}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>
                            Question
                        </label>
                        <textarea 
                            className='form-control' 
                            id='exampleFormControlTextarea1' 
                            rows={3} 
                            onChange={e => setQuestion(e.target.value)} 
                            value={question}
                            placeholder='Enter your question here...'
                        />
                    </div>
                    <div>
                        <button type='button' className='btn btn-primary mt-3' onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
