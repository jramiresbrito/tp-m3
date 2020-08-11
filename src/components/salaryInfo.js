import React, { Component } from 'react';
import calculateSalaryFrom from '../services/salaryCalculator';
import css from './salaryInfo.module.css';
import Input from './input/input';
import formatNumber from '../helpers/formatHelper';
import percentageCalculator from '../services/percentageCalculator';

const calc = calculateSalaryFrom;
const perc = percentageCalculator;

export default class SalaryInfo extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1,
      baseINSS: 0,
      baseIRPF: 0,
      discountINSS: 0,
      discountIRPF: 0,
      netSalary: 0,
    };
  }

  handleInputChange = (value) => {
    const calcs = calc(value);
    console.log(calcs);
    const { baseINSS, baseIRPF, discountINSS, discountIRPF, netSalary } = calcs;

    this.setState({
      fullSalary: value,
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
    });
  };

  render() {
    const {
      fullSalary,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
    } = this.state;

    return (
      <>
        <div className={css.salaryInfo}>
          <h1>Calculadora de Impostos</h1>
          <div className={`${css.salaryInputContainer} ${css.inputSize}`}>
            <p>Salário Bruto</p>
            <Input
              type="number"
              min="0"
              max="5"
              onChangeValue={this.handleInputChange}
              value={fullSalary}
            />
          </div>
          <div className={`${css.salaryOutputContainer} ${css.inputSize}`}>
            <div className={css.salaryInputContainer}>
              <p>Base INSS</p>
              <Input type="text" readonly value={`R$${formatNumber(fullSalary)}`} />
            </div>
            <div className={css.salaryInputContainer}>
              <p>Desconto INSS</p>
              <Input
                type="text"
                readonly
                value={`R$${formatNumber(discountINSS)} ${formatNumber(
                  perc(discountINSS, fullSalary)
                )}%`}
              />
            </div>
            <div className={css.salaryInputContainer}>
              <p>Base IRPF</p>
              <Input type="text" readonly value={`R$${formatNumber(baseIRPF)}`} />
            </div>
            <div className={css.salaryInputContainer}>
              <p>Desconto IRPF</p>
              <Input
                type="text"
                readonly
                value={`R$${formatNumber(discountIRPF)} ${formatNumber(
                  perc(discountIRPF, fullSalary)
                )}%`}
              />
            </div>
          </div>
          <div className={`${css.salaryInputContainer} ${css.inputSizeSmall}`}>
            <p>Salário Líquido</p>
            <Input
              type="text"
              readonly
              className='blue-text'
              value={`R$${formatNumber(netSalary)} ${formatNumber(
                perc(netSalary, fullSalary)
              )}%`}
            />
          </div>
        </div>
      </>
    );
  }
}
