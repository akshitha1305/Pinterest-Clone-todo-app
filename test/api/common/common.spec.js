import Sinon from 'sinon';
import * as responseMain from '../../../src/utils/response';

describe('Sample Testcase', () => {
    const finalResp = {
        statusCode: 200,
        message: 'OK',
        status: 'success',
        response: {},
        error: false
    };

    const response = {
        status: jest.fn(),
        send: jest.fn()
    };
    let sendResp;
    beforeEach(() => {
        sendResp = Sinon.stub(responseMain, 'sendRsp');
    });
    afterEach(() => {
        responseMain.sendRsp.restore();
    });
    it('Sample test case', done => {
        sendResp.returns(finalResp);
        const data = responseMain.sendRsp(response, 200, 'OK', {}, {});
        done();
    });
});

