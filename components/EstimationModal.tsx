import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EstimationModal = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [projectDetails, setProjectDetails] = useState({
    developmentStage: '',
    targetDisease: '',
    moleculeType: '',
    regulatoryStrategy: '',
    timeline: '',
  });

  const generateEstimate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(currentStep + 1);
    }, 2000);
  };

  const renderEstimationStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">基本情報入力</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">開発ステージ</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.developmentStage}
                  onChange={(e) => setProjectDetails({...projectDetails, developmentStage: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="preclinical">前臨床</option>
                  <option value="phase1">Phase I</option>
                  <option value="phase2">Phase II</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">対象疾患</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.targetDisease}
                  onChange={(e) => setProjectDetails({...projectDetails, targetDisease: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="cancer">がん</option>
                  <option value="rare">希少疾患</option>
                  <option value="chronic">慢性疾患</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">分子種別</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.moleculeType}
                  onChange={(e) => setProjectDetails({...projectDetails, moleculeType: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="antibody">抗体医薬品</option>
                  <option value="smallMolecule">低分子医薬品</option>
                  <option value="cellTherapy">細胞治療</option>
                </select>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => setCurrentStep(2)}
            >
              次へ
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">規制戦略・タイムライン</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">規制戦略</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.regulatoryStrategy}
                  onChange={(e) => setProjectDetails({...projectDetails, regulatoryStrategy: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="standard">標準的な申請</option>
                  <option value="expedited">迅速審査</option>
                  <option value="conditional">条件付き承認</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">目標タイムライン</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.timeline}
                  onChange={(e) => setProjectDetails({...projectDetails, timeline: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="6months">6ヶ月以内</option>
                  <option value="12months">12ヶ月以内</option>
                  <option value="18months">18ヶ月以内</option>
                </select>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={generateEstimate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  見積もり生成中...
                </>
              ) : (
                '見積もりを生成'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">見積もり結果</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="mb-4">
                <h4 className="font-medium">推奨チーム構成</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">海外エキスパート（45,000円/時間） x 255時間</p>
                  <p className="text-sm">本邦エキスパート（25,000円/時間） x 135時間</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium">想定タイムライン</h4>
                <p className="text-sm mt-1">6ヶ月（基本計画から申請完了まで）</p>
              </div>
              <div>
                <h4 className="font-medium">見積金額（税込）</h4>
                <p className="text-2xl font-bold text-blue-600 mt-1">¥17,820,000</p>
                <div className="text-xs text-gray-500">
                  <p>税抜：¥16,200,000</p>
                  <p>消費税：¥1,620,000</p>
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                setCurrentStep(1);
                setProjectDetails({
                  developmentStage: '',
                  targetDisease: '',
                  moleculeType: '',
                  regulatoryStrategy: '',
                  timeline: '',
                });
              }}
            >
              新しい見積もりを作成
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>見積もりを生成</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {currentStep === 1 && "プロジェクト情報入力"}
            {currentStep === 2 && "規制戦略・タイムライン設定"}
            {currentStep === 3 && "見積もり結果"}
          </DialogTitle>
        </DialogHeader>
        {renderEstimationStep()}
      </DialogContent>
    </Dialog>
  );
};

export default EstimationModal; 