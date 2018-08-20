import Task from './task';

export default (tasks: Task[], originalValue: any) => {
  const result = tasks.reduce((accumulator, task) => {
    const perform = accumulator.transformed === false && task.condition();
    return perform ? {
      value: task.perform(originalValue),
      transformed: true
    } : accumulator;
  }, {
    value: null,
    transformed: false
  });

  return result.transformed ? result.value : originalValue;
};