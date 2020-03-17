import Model from "./model.js";
import { DECREASE_COIN } from "../action/coinAction.js";
import { NUM_TO_STR } from "../util/constants.js";
import { GET_BACK_CHANGES } from "../action/changeAction.js";

class WalletModel extends Model {
  constructor() {
    super();
    this.state = {
      ten: 4,
      fifty: 3,
      hundred: 6,
      fiveHundred: 4,
      thousand: 2,
      fiveThousand: 1,
      tenThousand: 1,
    };
  }

  isCoinCountZero(target) {
    return this.state[NUM_TO_STR[`${target}`]] === 0;
  }

  dispatch(userAction) {
    if (!Array.isArray(userAction)) {
      this.notify.call(this, [this.state]);
      return;
    }
    const [action] = userAction;
    const { type, payload } = action;

    switch (type) {
      case DECREASE_COIN:
        const targetPropertyName = NUM_TO_STR[`${payload}`];
        this.state = {
          ...this.state,
        };
        this.state[`${targetPropertyName}`] = this.state[`${targetPropertyName}`] - 1;
        break;
      case GET_BACK_CHANGES:
        this.state = {
          ten: this.state.ten + payload.ten,
          fifty: this.state.fifty + payload.fifty,
          hundred: this.state.hundred + payload.hundred,
          fiveHundred: this.state.fiveHundred + payload.fiveHundred,
          thousand: this.state.thousand + payload.thousand,
          fiveThousand: this.state.fiveThousand + payload.fiveThousand,
          tenThousand: this.state.tenThousand + payload.tenThousand,
        };
        break;
      default:
        break;
    }
    this.notify.call(this, [this.state]);
  }
}

export default WalletModel;
