import configDev from './rollups/rollup.config.dev'
import configProd from './rollups/rollup.config.prod'
export default commandLineArgs =>{
    return process.env.BUILD === 'production' ? configProd :  configDev;
}
