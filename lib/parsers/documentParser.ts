import officeParser from "officeparser";

const documentParser = async (file: Buffer): Promise<string> => {
  return await officeParser.parseOfficeAsync(file);
};

export default documentParser;
