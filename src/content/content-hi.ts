import type {
  tool as _tool,
  web2pdftool as _web2pdftool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../../content";

export const nav_content = {
  // इसे अनदेखा करें
  brand: "Equips",
  merge_pdf: "पीडीएफ विलय करें",
  split_pdf: "पीडीएफ विभाजित करें",
  compress_pdf: "पीडीएफ संपीड़ित करें",
  convert_pdf: "पीडीएफ परिवर्तित करें",
  convert_to_pdf: "पीडीएफ में परिवर्तित करें",
  jpg_to_pdf: "जेपीजी से पीडीएफ",
  word_to_pdf: "शब्द से पीडीएफ",
  markdown_to_pdf: "पीडीएफ में मार्कडाउन करें",
  powerpoint_to_pdf: "पावरपॉइंट से पीडीएफ",
  excel_to_pdf: "एक्सेल से पीडीएफ",
  html_to_pdf: "एचटीएमएल से पीडीएफ",
  web_to_pdf: "वेब से पीडीएफ",
  convert_from_pdf: "पीडीएफ से परिवर्तित करें",
  read_edit_pdf: "पीडीएफ पढ़ें और संपादित करें",
  pdf_to_jpg: "पीडीएफ से जेपीजी",
  pdf_to_word: "पीडीएफ से शब्द",
  pdf_to_powerpoint: "पीडीएफ से पावरपॉइंट",
  pdf_to_excel: "पीडीएफ से एक्सेल",
  pdf_to_pdf_a: "पीडीएफ से पीडीएफ/ए",
  pdf_to_text: "पाठ के लिए पीडीएफ",
  pdf_to_html: "पीडीएफ से एचटीएमएल",
  pdf_to_markdown: "PDF से मार्कडाउन तक",
};
export const tool: _tool = {
  Edit_PDF: {
    title: "पीडीएफ संपादित करें",
    description: "पीडीएफ फ़ाइल में टेक्स्ट, छवियों, और लेआउट को संपादित करें",
    color: "#3867d6",
    type: ".pdf",
    to: "/edit-pdf-hi",
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "merge-pdf": [
      "PDF फ़ाइलें मर्ज़ की गई हैं!",
      "PDF फ़ाइल को मर्ज़ किया गया है!",
    ],
  },
  btnText: {
    "merge-pdf": [
      "मर्ज़ की गई PDF फ़ाइलें डाउनलोड करें",
      "मर्ज़ की गई PDF फ़ाइल डाउनलोड करें",
    ],
  },
  backto: {
    "merge-pdf": "मर्ज़ की गई PDF को वापस जाएं",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    merge_pdf: "PDF फ्यूज़न विकल्प",
  },
  loader_text: "कृपया प्रतीक्षा करें...",
  add_more_button: "अधिक फ़ाइलें जोड़ें",
  action_buttons: {
    merge_pdf: "पीडीएफ विलय करें",
  },
  pages: "पृष्ठों",
  page: "पृष्ठ",
};

export const tools: _tools = {
  select: "चुनें",
  or_drop: "या फ़ाइलें यहां छोड़ें",
  files: "फाइलें",
  drop_files: "फ़ाइलें यहाँ खींचें",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "फ़ाइल खाली है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "फ़ाइल बहुत बड़ी है। कृपया एक छोटी फ़ाइल चुनें या हमारा कंप्रेस-पीडीएफ़ उपकरण उपयोग करके फ़ाइल का आकार कम करें।",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "फ़ाइल एक समर्थित प्रकार नहीं है।",
    types: {
      PDF: "कृपया एक मान्य पीडीएफ़फ़ाइल चुनें।",
      JPG: "कृपया एक मान्य जेपेग छवि फ़ाइल चुनें।",
      DOC: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      DOCX: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      XLS: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      XLSX: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      PPT: "कृपया एक मान्यपावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
      PPTX: "कृपया एक मान्य पावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "फ़ाइल का डाटा भ्रष्ट है और इसे प्रसंस्करण नहीं किया जा सकता है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "फ़ाइल में फ़ॉन्ट गुम हैं। कृपया सुनिश्चित करें कि पीडीएफफ़ाइल में सभी फ़ॉन्ट एम्बेड हैं।",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "फ़ाइल में अवैध छवि डेटा है। कृपया सुनिश्चित करें कि सभी छवियाँ सही ढंग से फ़ॉर्मेटेड हैं।",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "फ़ाइल में सुरक्षा जोखिम हो सकता है और इसे प्रसंस्करण नहीं किया जा सकता है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "आपने अनुमति दी हुई अधिकतम फ़ाइलों की संख्या पार कर दी है। कृपया कुछ फ़ाइलें हटाएं और पुनः प्रयास करें।",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "कोई फ़ाइल चयनित नहीं की गई है। कृपया कम से कम एक फ़ाइल चुनें।",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "एक अज्ञात त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें या सहायता से संपर्क करें।",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "नेटवर्क में त्रुटि हो गई है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    code: "ERR_NETWORK",
  },

  ERR_UPLOAD_COUNT: {
    message: "कृपया फ्यूजन करने के लिए कम से कम दो फ़ाइलें अपलोड करें।",
    code: "ERR_UPLOAD_COUNT",
  },
};
