import {
  ConfigData,
  FileSystemConfigLoader,
  HtmlValidate,
} from 'html-validate/dist/es/index.js';
import pretty from 'pretty';

type GetMaxLength = <T extends Record<K, string>, K extends keyof T>(
  obj: T[],
  key: K
) => number;

const getFieldMaxLength: GetMaxLength = (values, key) =>
  values.reduce((max, m) => Math.max(max, m[key].length), 0);

type Message = {
  ruleId: string;
  line: number;
  column: number;
  message: string;
};

const formatErrorMessages = (messages: Message[]) => {
  const maxLength = getFieldMaxLength(messages, 'ruleId');
  const formattedMessages = messages.map((m) => {
    const errorLocation = `${m.line}:${m.column}`.padEnd(5);
    const ruleViolated = `[${m.ruleId}]:`.padEnd(maxLength + 3);

    return `${errorLocation} ${ruleViolated} ${m.message}`;
  });

  return formattedMessages.join('\n');
};

export function toRenderValidHTML(
  this: { testPath?: string },
  received: string,
  expected: ConfigData
) {
  // Loads config from .htmlvalidate.json
  const loader = new FileSystemConfigLoader();
  const htmlValidate = new HtmlValidate(loader);

  const html = pretty(received, { ocd: false });
  const path = this.testPath ?? '';

  const report = htmlValidate.validateStringSync(html, path, expected);

  const pass = report.valid;

  // Used if checking `expect().not.toRenderValidHTML()`
  if (pass) {
    return {
      pass,
      message: () => 'Expected to render invalid HTML.',
    };
  }

  const formattedErrors = formatErrorMessages(report.results[0].messages);
  const message = () =>
    `Found ${report.errorCount} HTML violation(s):\n\n${formattedErrors} \n\n${html}`;

  return {
    pass,
    message,
    actual: html,
  };
}
