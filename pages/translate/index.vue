<template>
  <div class="trans-wrap">
    <el-row style="margin-bottom: 8px;">
      <el-col :span="24">
        <el-switch
          v-model="langType"
          active-text="EN->ZH"
          inactive-text="ZH->EN"
        >
        </el-switch>
      </el-col>
    </el-row>
    <el-row class="trans-middle" :gutter="8">
      <el-col :span="12">
        <el-input
          v-model.lazy="tempTxt"
          type="textarea"
          class="trans-middle-txt"
          placeholder="No function just for temporary content"
        >
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="srcTxt"
          :row="4"
          type="textarea"
          placeholder="Input the words you want translate"
        >
        </el-input>
        <ul class="trans-ul">
          <li v-for="(plat, key) in platforms" :key="key" class="trans-li">
            <div class="trans-li-top">
              {{ plat.name }}
              <el-tooltip
                v-if="key === 'google'"
                effect="dark"
                content="If google translate doesn't work, Click this btn"
                placement="left"
              >
                <el-button
                  size="mini"
                  style="float: right;"
                  @click="handleUpdateGoogleTKK"
                  >Update Google TKK</el-button
                >
              </el-tooltip>

              <el-button size="mini" @click="handleInsert(key)"
                >Insert</el-button
              >
            </div>
            <div class="trans-li-txt">{{ plat.txt }}</div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row style="margin-top: 8px;">
      <el-col :span="24">
        <el-input
          ref="resultDom"
          v-model.lazy="resultTxt"
          type="textarea"
          :rows="8"
          placeholder="No function just for result"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import _ from 'lodash';
import {
  transByBaidu,
  transByGoogle,
  transByYoudao,
  updateGoogleTKK
} from './services';
type PlatformKey = 'google' | 'baidu' | 'youdao';
@Component
class Translate extends Vue {
  tempTxt: string = '';
  resultTxt: string = '';
  srcTxt: string = '';
  langType: boolean = true;

  platforms = {
    google: {
      name: 'Google',
      txt: ''
    },
    baidu: {
      name: 'Baidu',
      txt: ''
    },
    youdao: {
      name: 'Youdao',
      txt: ''
    }
  };

  @Watch('srcTxt')
  onSrcTxtChanged(val: string) {
    const from = this.langType ? 'en' : 'zh';
    const to = this.langType ? 'zh' : 'en';
    this.fetchTransRes(val, from, to);
  }

  fetchTransRes = _.debounce((val, from, to) => {
    transByBaidu(val, from, to).then((data) => {
      this.platforms.baidu.txt = _.get(data, 'trans_result[0].dst', '');
    });
    transByGoogle(val, from, to).then((data) => {
      this.platforms.google.txt = _.get(data, '[0][0][0]', '');
    });
    transByYoudao(val, from, to).then((data) => {
      this.platforms.youdao.txt = _.get(data, 'translateResult[0][0].tgt', '');
    });
  }, 500);

  handleUpdateGoogleTKK() {
    updateGoogleTKK();
  }

  handleInsert(key: PlatformKey) {
    this.resultTxt = this.resultTxt + this.platforms[key].txt + ' ';
    this.srcTxt = '';
    // @ts-ignore
    this.$refs.resultDom.focus();
  }
}
export default Translate;
</script>
<style>
.trans-wrap {
  padding: 16px;
}
.trans-wrap,
.trans-middle > div,
.trans-ul,
.trans-li {
  display: flex;
  flex-direction: column;
}
.trans-wrap,
.trans-middle > div,
.trans-middle-txt,
.trans-middle-txt > textarea {
  height: 100%;
}
.trans-middle,
.trans-ul,
.trans-li,
.trans-li-txt {
  flex: 1;
}
.trans-li {
  margin-top: 8px;
}
.trans-li-txt {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 8px;
  background-color: #f5f7fa;
  font-size: 14px;
  padding: 5px 8px;
}
</style>
