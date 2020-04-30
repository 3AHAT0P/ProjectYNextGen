import * as Comlink from 'comlink';

import MainLogicAgent from './MainLogicAgent/MainLogicAgent';

Comlink.expose(MainLogicAgent);

export default MainLogicAgent;
