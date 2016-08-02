import { moment } from '../../utils'
import faker from 'faker'
import Chance from 'chance'

const chance = new Chance()

export default {

  random: {

    gender () { return chance.gender() },

    fullName (gender) { return chance.first({ gender }) + ' ' + chance.last({ gender }) },
    firstName (gender) { return chance.first({ gender }) },
    lastName (gender) { return chance.last({ gender }) },
    userName () { return faker.internet.userName() },
    birthday () { return moment(chance.birthday({ string: true, american: false }), 'DD/MM/YYYY') },

    email (first, last, domainName, domainSuffix) { return first + '.' + last + '@' + (domainName || faker.internet.domainName()) + '.' + (domainSuffix || faker.internet.domainSuffix()) },
    ip () { return faker.internet.ip() },

    filename () { return faker.system.fileName() },
    filetype () { return faker.system.fileType() },

    companyName () { return faker.company.companyName() },

    domainName () { return faker.internet.domainName() },
    domainSuffix () { return faker.internet.domainSuffix() },

    account () { return faker.finance.account() },
    accountName () { return faker.finance.accountName() },

    dice (formula) { return chance.rpg(formula) },

    date () { return moment(chance.date({ string: true, american: false }), 'DD/MM/YYYY') },

    array () { return faker.random.arrayElement(...arguments) },
    object () { return faker.random.objectElement(...arguments) },

  },

}
