import fs from 'node:fs/promises'
import {
  GoogleSpreadsheet,
  type GoogleSpreadsheetRow,
} from 'google-spreadsheet'
import { GoogleAuth } from 'google-auth-library'

import { fileURLToPath } from 'url'
import path from 'path'

const scriptsFolderPath = path.dirname(fileURLToPath(import.meta.url))
const projectRootPath = path.normalize(scriptsFolderPath + '/..')

const configFileName = 'i18nSheetConfig.json.local'

const configPath = path.resolve(projectRootPath, configFileName)

const resourcesFolderPath = path.resolve(projectRootPath, 'src/i18n/resources')

const supportedLanguage = ['en-US', 'zh-TW'] as const

type SupportedLanguage = (typeof supportedLanguage)[number]

type Translation = { key: string } & Record<SupportedLanguage, string>

const readJsonFile = async (filePath: string) => {
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

const writeJsonFile = async (
  filePath: string,
  data: Record<string, unknown>,
) => {
  const format = (record: Record<string, unknown>) =>
    JSON.stringify(record, null, 2) + '\n'

  const content = format(data)
  await fs.writeFile(filePath, content, 'utf-8')
}

const parseTranslationRow = (
  row: GoogleSpreadsheetRow<Translation>,
): Translation => {
  const cols = ['key', ...supportedLanguage] as const
  return cols.reduce(
    (translation, col) => ({ ...translation, [col]: row.get(col) }),
    {} as Translation,
  )
}

const getJsonByLanguage = (
  translations: Translation[],
  language: SupportedLanguage,
) => {
  return Object.fromEntries(
    translations.map((item) => [item.key, item[language]]),
  )
}

const main = async () => {
  const config = await readJsonFile(configPath)
  const { googleSheetId: sheetId } = config

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const client = await auth.getClient()

  const doc = new GoogleSpreadsheet(sheetId, client)
  await doc.loadInfo()

  const sheets = doc.sheetsByIndex
  if (sheets.length === 0) {
    throw new Error('No worksheets found in the configured Google Sheet.')
  }

  const allRows = await Promise.all(
    sheets.map((sheet) => sheet.getRows<Translation>()),
  )
  const translations = allRows.flat().map(parseTranslationRow)

  const writeTasks = supportedLanguage.map((lang) => {
    const jsonContent = getJsonByLanguage(translations, lang)
    const filePath = path.resolve(resourcesFolderPath, `${lang}.json`)
    return writeJsonFile(filePath, jsonContent)
  })

  await Promise.all(writeTasks)
}

main()
