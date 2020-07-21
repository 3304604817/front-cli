import { getModuleRouters } from 'utils/utils';
import * as hzeroFrontHpfmRouters from 'hzero-front-hpfm/lib/utils/router';
import * as hzeroFrontHiamRouters from 'hzero-front-hiam/lib/utils/router';
import * as hzeroFrontHcnfRouters from 'hzero-front-hcnf/lib/utils/router';
import * as hzeroFrontHimpRouters from 'hzero-front-himp/lib/utils/router';
import * as hzeroFrontHmsgRouters from 'hzero-front-hmsg/lib/utils/router';
import * as hzeroFrontHwfpRouters from 'hzero-front-hwfp/lib/utils/router';

export default (app) =>
  getModuleRouters(app, [
    hzeroFrontHpfmRouters,
    hzeroFrontHiamRouters,
    hzeroFrontHcnfRouters,
    hzeroFrontHimpRouters,
    hzeroFrontHmsgRouters,
    hzeroFrontHwfpRouters,
  ]);
