import { config } from 'dotenv';
import { program } from 'commander';
import { lookupLinkedInUrl } from './agents/linkedin-lookup-agent';
import { stripThinkTag } from './utils/thinking-agent-response';

config();

// Set up the command-line interface
program
  .version('1.0.0')
  .description('Fetch summary and fun facts about a person by name')
  .option('--name <name>', 'Name of the person to search for')
  .action(async (options) => {
    if (!options.name) {
      console.error('Error: --name parameter is required.');
      program.help();
      return;
    }

    const personInfo = await lookupLinkedInUrl(options.name).then((response) =>
      stripThinkTag(response)
    );
    console.log(personInfo);
  });

// Parse command-line arguments
program.parse(process.argv);
