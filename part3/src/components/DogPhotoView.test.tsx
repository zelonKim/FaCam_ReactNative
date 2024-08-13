import {render, waitFor} from '@testing-library/react-native';
import { DogPhotoView } from './DogPhotoView';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../utils/AxiosUtils';


describe('DogPhoto 렌더링 테스트', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(api);
    })

    afterAll(() => {
        mock.reset();
    })


    test('DogPhotoView 렌더링 스냅샷', async() => {
        mock.onGet(new RegExp('/breeds/image/random')).reply(200, {
            message: 'TEST_MESSAGE',
            status: 'SUCCESS'
        })

        const component = render(<DogPhotoView />);

        await waitFor(() => component.findByTestId('image'), {timeout: 2000})

        expect(component.toJSON()).toMatchSnapshot();

    })

})
