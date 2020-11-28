process.env.TESTING_GENERATOR_CLI = true;

const main = require('../bin/index');

jest.mock('../http');

const modulesMocked = {
    'configFileController': {
        'updateConfigFile': jest.fn(),
        'cleanConfigFile': jest.fn(),
        'getConfigFileContent': jest.fn(()=>({}))
    },
    '../http':{
        'get': jest.fn(()=>Promise.resolve()),
        'post': jest.fn(()=>Promise.resolve())
    }
};

global.requireFromRoot = module => modulesMocked[module]


const runCommand = jest.fn();
console.log = jest.fn();
console.error = jest.fn();

global.runCommand = runCommand;


beforeEach(() => { 
    jest.clearAllMocks()
});

describe('config', () => {
    test('app', () => {
        
        const commands = ['config', 'app', 'test']
        main(commands)
        expect(modulesMocked.configFileController.updateConfigFile).toHaveBeenCalledTimes(1)

        const calledWithParams = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[0][0])
        const expected = JSON.stringify({currentApp: "test"})

        expect(calledWithParams).toBe(expected)
        
    });

    test('clean', () => {
        
        const commands = ['config', 'clean']
        main(commands)
        expect(modulesMocked.configFileController.cleanConfigFile).toHaveBeenCalledTimes(1)

    });


    test('force', () => {
        
        const commands = ['config', 'force']

        modulesMocked.configFileController.getConfigFileContent.mockReturnValueOnce({})

        main(commands)
        expect(modulesMocked.configFileController.updateConfigFile).toHaveBeenCalledTimes(1)
        expect(modulesMocked.configFileController.getConfigFileContent).toHaveBeenCalledTimes(1)

        let calledWith = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[0][0]);
        let expected = JSON.stringify({"forceMode":true});
        
        expect(calledWith).toBe(expected)

        modulesMocked.configFileController.getConfigFileContent.mockReturnValueOnce({forceMode:true})
        
        main(commands)
        calledWith = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[1][0]);
        expected = JSON.stringify({"forceMode":false});

        expect(calledWith).toBe(expected)

    });


    test('frontend', () => {
        
        const commands = ['config', 'frontend', 'test']

        main(commands)
        calledWith = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[0][0]);
        expected = JSON.stringify({"currentFrontend":"test"});
        expect(calledWith).toBe(expected)

    });

    test('show', () => {
        
        const commands = ['config', 'show']
        main(commands)
        expect(modulesMocked.configFileController.getConfigFileContent).toHaveBeenCalledTimes(1)
    });

    test('url', () => {
        const commands = ['config', 'url', 'test.url']
        main(commands)

        calledWith = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[0][0]);
        expected = JSON.stringify({"GeneratorURL":"test.url"});
        expect(calledWith).toBe(expected)
        
        expect(runCommand.mock.calls[0][0]).toBe('config show')
    });

    it('should remove the trailing slash from config url', () => {
        const commands = ['config', 'url', 'http://some.url.com/']
        main(commands)

        calledWith = JSON.stringify(modulesMocked.configFileController.updateConfigFile.mock.calls[0][0]);
        expected = JSON.stringify({"GeneratorURL":"http://some.url.com"});
        expect(calledWith).toBe(expected)
    });


});

describe('create', () => {

    test('app', () => {
        const commands = ['create', 'app', 'test']

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'test',
            GeneratorId: 1
          }))
        
    });

    it('should define the componentName from cli-config-file if appname is not received', () => {
        const commands = ['create', 'component', 'testComponent']

        modulesMocked.configFileController.getConfigFileContent.mockReturnValueOnce({currentApp:'myCurrentApp'})

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateComponent')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testComponent',
            Application: 'myCurrentApp'
          }))
    });


    test('components', () => {
        const commands = ['create', 'component', 'testComponent', 'myTestApp']

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateComponent')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testComponent',
            Application: 'myTestApp'
          }))
        
    });


    it('should define the entityName from cli-config-file if appname is not received', () => {
        const commands = ['create', 'entity', 'testEntity']

        modulesMocked.configFileController.getConfigFileContent.mockReturnValueOnce({currentApp:'myCurrentApp'})

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateEntity')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testEntity',
            Application: 'myCurrentApp'
          }))
    });

    test('entity', () => {
        const commands = ['create', 'entity', 'testEntity', 'myTestApp']

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateEntity')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testEntity',
            Application: 'myTestApp'
          }))
        
    });


    it('should define the frontend from cli-config-file if appname is not received', () => {
        const commands = ['create', 'frontend', 'testFrontend']

        modulesMocked.configFileController.getConfigFileContent.mockReturnValueOnce({currentApp:'myCurrentApp'})

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateFrontend')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testFrontend',
            Application: 'myCurrentApp'
          }))
    });

    test('frontend', () => {
        const commands = ['create', 'frontend', 'testFrontend', 'myTestApp']

        main(commands)

        const [param_1, param_2] = modulesMocked['../http'].post.mock.calls[0]
        
        expect(param_1).toBe('/Application/CreateFrontend')
        expect(JSON.stringify(param_2)).toBe(JSON.stringify({
            Name: 'testFrontend',
            Application: 'myTestApp'
          }))
        
    });
    
});

describe('get', () => {
    
    test('apps', () => {
        const commands = ['get', 'apps']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetApplications')        
    });

    test('components', () => {
        const commands = ['get', 'components', 'testApp']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetComponentsInApplication/testApp')        
    });

    test('djson', () => {
        const commands = ['get', 'djson', 'testApp']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetApplicationDJSON/testApp')        
    });

    test('pages', () => {
        const commands = ['get', 'pages', 'testApp', 'testFront']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetPagesInApplicationAndFrontend/testApp/testFront')        
    });


    test('frontends', () => {
        const commands = ['get', 'frontends', 'testApp']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetFrontendsInApplication/testApp')        
    });

    test('entities', () => {
        const commands = ['get', 'entities', 'testApp']

        main(commands)
        const [param_1] = modulesMocked['../http'].get.mock.calls[0]
        
        expect(param_1).toBe('/Generator/GetEntitiesInApplication/testApp')        
    });

});