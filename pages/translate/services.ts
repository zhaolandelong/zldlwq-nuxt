import axios from 'axios';

// const API: string = 'https://yapi.bytedance.net/mock/380/api/translate';
const API: string = '/api/translate';
export type LangType = 'zh' | 'en';

interface BaiduRes {
  from: LangType;
  to: LangType;
  trans_result: {
    src: string;
    dst: string;
  }[];
}
export function transByBaidu(
  query: string,
  from: LangType = 'en',
  to: LangType = 'zh'
) {
  return axios
    .get<BaiduRes>(`${API}/baidu`, {
      params: {
        query,
        from,
        to
      }
    })
    .then((res) => res.data);
}

type GoogleRes = [[[string, string, null, null, number]], null, LangType];
export function transByGoogle(
  query: string,
  from: LangType = 'en',
  to: LangType = 'zh'
) {
  return axios
    .get<GoogleRes>(`${API}/google`, {
      params: {
        query,
        from,
        to
      }
    })
    .then((res) => res.data);
}

interface YoudaoRes {
  translateResult: [[{ tgt: string; src: string }]];
  errorCode: number;
  type: string;
  smartResult: {
    entries: string[];
    type: number;
  };
}
export function transByYoudao(
  query: string,
  from: LangType = 'en',
  to: LangType = 'zh'
) {
  return axios
    .get<YoudaoRes>(`${API}/youdao`, {
      params: {
        query,
        from,
        to
      }
    })
    .then((res) => res.data);
}

export function updateGoogleTKK() {
  return axios.get<string>(`${API}/update_google_tkk`).then((res) => res.data);
}
