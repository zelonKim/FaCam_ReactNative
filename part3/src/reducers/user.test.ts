import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userReducer } from './user';

describe('리덕스 유저 렌더링 테스트', () => {
    const mockStore = configureStore([thunk]);

    test('History Item set 테스트', async() => {
        return expect(
            userReducer(
                {   user: null, 
                    history: []
                }, 
                {
                    type:'GET_USER_LIKED_HISTORY_SUCCESS', 
                    history:[{photoUrl: 'TEST_URL.jpg'}]
                }
            )
        ).toEqual({
            user: null,
            history: [
                {
                    photoUrl: 'TEST_URL.jpg'
                }
            ]
        })
    })
})